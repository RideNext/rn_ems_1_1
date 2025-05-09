/*-
 * ========================LICENSE_START=================================
 * O-RAN-SC
 * %%
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* ==================================================================================
 * Copyright (C) 2021-2023 Nordix Foundation
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================LICENSE_END===================================
 */

package org.oran.datafile.datastore;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.oran.datafile.configuration.AppConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileSystemUtils;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class FileStore implements DataStore {
    private static final Logger logger = LoggerFactory.getLogger(java.lang.invoke.MethodHandles.lookup().lookupClass());

    AppConfig appConfig;

    public FileStore(AppConfig applicationConfig) {
        this.appConfig = applicationConfig;
    }

    @Override
    public Flux<String> listObjects(Bucket bucket, String prefix) {
        Path root = Path.of(appConfig.getCollectedFilesPath(), prefix);
        if (!root.toFile().exists()) {
            root = root.getParent();
        }

        logger.debug("Listing files in: {}", root);

        List<String> result = new ArrayList<>();
        try (Stream<Path> stream = Files.walk(root, Integer.MAX_VALUE)) {

            stream.forEach(path -> filterListFiles(path, prefix, result));

            return Flux.fromIterable(result);
        } catch (Exception e) {
            return Flux.error(e);
        }
    }

    private void filterListFiles(Path path, String prefix, List<String> result) {
        if (path.toFile().isFile() && externalName(path).startsWith(prefix)) {
            result.add(externalName(path));
        } else {
            logger.debug("Ignoring file {} that does not start with: {}", path, prefix);
        }
    }

    private String externalName(Path path) {
        String fullName = path.toString();
        System.out.println("fullName"+fullName);
        System.out.println(" fullName.substring"+appConfig.getCollectedFilesPath());
        String externalName = fullName.substring(appConfig.getCollectedFilesPath().length());
        if (externalName.startsWith("/")) {
            externalName = externalName.substring(1);
        }
        return externalName;
    }

    @Override
    public Mono<byte[]> readObject(Bucket bucket, String fileName) {
        try {
            byte[] contents = Files.readAllBytes(path(fileName));
            return Mono.just(contents);
        } catch (Exception e) {
            return Mono.error(e);
        }
    }

    @Override
    public Mono<Boolean> createLock(String name) {
        File file = path(name).toFile();
        try {
            Files.createDirectories(path(name).getParent());
            boolean res = file.createNewFile();
            return Mono.just(res);
        } catch (Exception e) {
            logger.warn("Could not create lock file: {}, reason: {}", file.getPath(), e.getMessage());
            return Mono.just(!file.exists());
        }
    }

    @Override
    public Mono<String> copyFileTo(Path from, String to) {
        try {
            Path toPath = path(to);
            Files.createDirectories(toPath);
            Files.copy(from, path(to), StandardCopyOption.REPLACE_EXISTING);
            return Mono.just(to);
        } catch (Exception e) {
            return Mono.error(e);
        }
    }

    @Override
    public Mono<Boolean> deleteLock(String name) {
        return deleteObject(Bucket.LOCKS, name);
    }

    @Override
    public Mono<Boolean> deleteObject(Bucket bucket, String name) {
        try {
            Files.delete(path(name));
            return Mono.just(true);
        } catch (Exception e) {
            return Mono.just(false);
        }
    }

    @Override
    public Mono<String> create(Bucket bucket) {
        return Mono.just("OK");
    }

    public Path path(String name) {
        return Path.of(appConfig.getCollectedFilesPath(), name);
    }

    public Mono<Boolean> fileExists(Bucket bucket, String key) {
        return Mono.just(path(key).toFile().exists());
    }

    @Override
    public Mono<String> deleteBucket(Bucket bucket) {
        try {
            FileSystemUtils.deleteRecursively(Path.of(appConfig.getCollectedFilesPath()));
        } catch (IOException e) {
            logger.debug("Could not delete directory: {}, reason; {}", appConfig.getCollectedFilesPath(),
                e.getMessage());
        }
        return Mono.just("OK");
    }

}
