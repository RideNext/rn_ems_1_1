/*
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt
 * =================================================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * =================================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * ============LICENSE_END==========================================================================
 */
package org.onap.ccsdk.features.sdnr.wt.helpserver;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.nio.file.Path;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.onap.ccsdk.features.sdnr.wt.helpserver.data.HelpInfrastructureObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardServletName;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardServletPattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@HttpWhiteboardServletPattern("/help/*")
@HttpWhiteboardServletName("HelpServlet")
@Component(service = Servlet.class)
public class HelpServlet extends HttpServlet implements AutoCloseable {

    private static Logger LOG = LoggerFactory.getLogger(HelpServlet.class);
    private static final long serialVersionUID = -4285072760648493461L;

    private static final String BASEURI = "/help";

    private final Path basePath;

    public HelpServlet() {
        LOG.info("Starting HelpServlet instance {}", this.hashCode());
        HelpInfrastructureObject.createFilesFromResources();
        this.basePath = HelpInfrastructureObject.getHelpDirectoryBase();
    }

    @Override
    public void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, PUT, DELETE");
        resp.addHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Content-Length");
    }

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String query = req.getQueryString();
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, PUT, DELETE");
        resp.addHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Content-Length");
        if (query != null && query.contains("meta")) {

            File f = new File(HelpInfrastructureObject.KARAFHELPDIRECTORY, "meta.json");
            if (f.exists()) {
                LOG.debug("found local meta file");
                try (BufferedReader rd = new BufferedReader(new FileReader(f));) {
                    String line = rd.readLine();
                    while (line != null) {
                        resp.getOutputStream().println(line);
                        line = rd.readLine();
                    }
                    rd.close();
                } catch (IOException e) {
                    LOG.debug("Can not read meta file", e);
                }
            } else {
                LOG.debug("start walking from path=" + basePath.toAbsolutePath().toString());
                HelpInfrastructureObject o = null;
                try {
                    o = new HelpInfrastructureObject(this.basePath);
                } catch (URISyntaxException e) {
                    LOG.debug("Can not relsolve URI. ", e);
                }
                resp.getOutputStream().println(o != null ? o.toString() : "");
            }
            resp.setHeader("Content-Type", "application/json");
        } else {
            LOG.debug("received get with uri=" + req.getRequestURI());
            String uri = URLDecoder.decode(req.getRequestURI().substring(BASEURI.length()), "UTF-8");
            if (uri.startsWith("/")) {
                uri = uri.substring(1);
            }
            Path p = basePath.resolve(uri);
            File f = p.toFile();
            if (f.isFile() && f.exists()) {
                LOG.debug("found file for request");
                if (this.isTextFile(f)) {
                    resp.setHeader("Content-Type", "application/text");
                    resp.setHeader("charset", "utf-8");
                } else if (this.isImageFile(f)) {
                    resp.setHeader("Content-Type", "image/*");
                } else if (this.ispdf(f)) {
                    resp.setHeader("Content-Type", "application/pdf");
                } else {
                    LOG.debug("file is not allowed to deliver");
                    resp.setStatus(404);
                    return;
                }
                LOG.debug("delivering file");
                try (OutputStream out = resp.getOutputStream()) {
                    try (FileInputStream in = new FileInputStream(f)) {

                        byte[] buffer = new byte[1024];
                        int len;
                        while ((len = in.read(buffer)) != -1) {
                            out.write(buffer, 0, len);
                        }
                        in.close();
                        out.flush();
                        out.close();
                    }
                } catch (IOException e) {
                    LOG.warn("Can not write meta file", e);
                    resp.setStatus(500);
                }
            } else {
                LOG.debug("found not file for request");
                resp.setStatus(404);
            }
        }
    }

    private boolean ispdf(File f) {
        return f != null && this.ispdf(f.getName());
    }

    private boolean ispdf(String name) {
        return name != null && name.toLowerCase().endsWith("pdf");
    }

    private boolean isImageFile(File f) {
        return f != null && this.isImageFile(f.getName());
    }

    private boolean isImageFile(String name) {

        return name != null
                ? name.toLowerCase().endsWith("png") || name.toLowerCase().endsWith("jpg")
                        || name.toLowerCase().endsWith("jpeg") || name.toLowerCase().endsWith("svg")
                        || name.toLowerCase().endsWith("eps")
                : false;
    }

    private boolean isTextFile(File f) {
        return f != null && this.isTextFile(f.getName());

    }

    private boolean isTextFile(String name) {
        return name != null
                ? name.toLowerCase().endsWith("md") || name.toLowerCase().endsWith("txt")
                        || name.toLowerCase().endsWith("html") || name.toLowerCase().endsWith("htm")
                        || name.toLowerCase().endsWith("js") || name.toLowerCase().endsWith("css")
                : false;
    }

    @Override
    public void close() throws Exception {}
}
