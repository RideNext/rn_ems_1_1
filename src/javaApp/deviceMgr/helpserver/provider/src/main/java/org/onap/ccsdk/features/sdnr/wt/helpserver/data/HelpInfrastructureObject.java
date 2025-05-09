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
package org.onap.ccsdk.features.sdnr.wt.helpserver.data;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import org.json.JSONObject;
import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelpInfrastructureObject extends JSONObject {

    private static final Logger LOG = LoggerFactory.getLogger(HelpInfrastructureObject.class);
    private static String HELPBASE = "help";
    private static String KARAFBUNDLERESOURCEHELPROOT = "/" + HELPBASE;
    private static String KARAFHELPDIRPREFIX = "data/cache/com.highstreet.technologies.";
    public static File KARAFHELPDIRECTORY = new File(KARAFHELPDIRPREFIX + HELPBASE);

    public static class VersionObject extends JSONObject {
        private static Comparator<VersionObject> comp;
        private final String mVersion;

        public String getVersion() {
            return this.mVersion;
        }

        public VersionObject(String path, String date, String label, String version) {
            this.mVersion = version;
            this.put("path", path);
            this.put("date", date);
            this.put("label", label);
        }

        public static Comparator<VersionObject> getComparer() {
            if (comp == null) {
                comp = (o1, o2) -> o1.getVersion().compareTo(o2.getVersion());
            }
            return comp;
        }

        public VersionObject cloneAsLatest() {
            return new VersionObject(this.getString("path"), this.getString("date"), this.getString("label"), "latest");
        }

        public VersionObject cloneAsCurrent() {
            return new VersionObject(this.getString("path"), this.getString("date"), this.getString("label"),
                    "current");
        }
    }
    public static class NodeObject extends JSONObject {
        public NodeObject(Path base, File dir, String label, ArrayList<VersionObject> versions) {
            this.put("label", label);
            if (versions != null && !versions.isEmpty()) {
                JSONObject o = new JSONObject();
                this.put("versions", o);
                for (VersionObject version : versions) {
                    o.put(version.getVersion(), version);
                }

            }
            File[] list = dir.listFiles();
            if (list == null) {
                return;
            }
            for (File f : list) {
                if (f.isDirectory()) {
                    ArrayList<VersionObject> versions2 = findReadmeVersionFolders(base, f.toPath(), true);
                    if (versions2 != null && !versions2.isEmpty()) {
                        JSONObject nodes;
                        if (!this.has("nodes")) {
                            this.put("nodes", new JSONObject());
                        }
                        nodes = this.getJSONObject("nodes");

                        NodeObject o = new NodeObject(base, f, f.getName(), versions2);
                        nodes.put(o.getString("label").toLowerCase(), o);
                    }
                }
            }
        }

    }

    public HelpInfrastructureObject(Path pRoot) throws URISyntaxException {
        File root = pRoot.toFile();
        File[] list = root.listFiles();
        if (list == null) {
            return;
        }
        for (File f : list) {
            if (f.isDirectory()) {
                ArrayList<VersionObject> versions = findReadmeVersionFolders(root.toPath(), f.toPath(), true);
                if (versions != null && !versions.isEmpty()) {
                    NodeObject o = new NodeObject(pRoot, f, f.getName(), versions);
                    this.put(o.getString("label").toLowerCase(), o);
                }
            }
        }
    }

    private static ArrayList<VersionObject> findReadmeVersionFolders(Path base, Path root, boolean appendCurrent) {
        ArrayList<VersionObject> list = new ArrayList<>();
        File[] files = root.toFile().listFiles();
        int baselen = base.toFile().getAbsolutePath().length();
        if (files != null) {
            for (File f : files) {
                if (f.isDirectory() && new File(f.getAbsolutePath() + "/README.md").exists()) {
                    list.add(new VersionObject(f.getAbsolutePath().substring(baselen + 1) + "/README.md", "", "",
                            f.getName()));
                }
            }
        }
        Collections.sort(list, VersionObject.getComparer());
        Collections.reverse(list);
        if (!list.isEmpty() && appendCurrent) {
            list.add(list.get(0).cloneAsCurrent());
        }
        return list;
    }


    public static void createFilesFromResources() {

        if (KARAFHELPDIRECTORY.exists()) {
            LOG.debug("Delete existing directory");
            try {
                ExtactBundleResource.deleteRecursively(KARAFHELPDIRECTORY);
            } catch (IOException e1) {
                LOG.warn(e1.toString());
            }
        }

        LOG.debug("Extract");
        try {
            Bundle b = FrameworkUtil.getBundle(HelpInfrastructureObject.class);
            if (b == null) {
                LOG.debug("No bundlereference: Use target in filesystem.");
                // URL helpRessource =
                // JarFileUtils.stringToJarURL("target/helpserver-impl-0.4.0-SNAPSHOT.jar",KARAFBUNDLERESOURCEHELPROOT);

            } else {
                LOG.debug("Bundle location:{} State:{}", b.getLocation(), b.getState());
                LOG.debug("Write files from Resource");
                ExtactBundleResource.copyBundleResoucesRecursively(b, "data/cache/com.highstreet.technologies.",
                        KARAFBUNDLERESOURCEHELPROOT);
            }
        } catch (IOException e) {
            LOG.warn("No help files available. Exception: " + e.toString());
        }
    }

    public static Path getHelpDirectoryBase() {
        return KARAFHELPDIRECTORY.toPath();
    }
}
