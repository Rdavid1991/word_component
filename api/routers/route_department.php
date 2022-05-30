<?php

if (str_contains($_GET["action"], "department")) {

    $cacheManager = new CacheManager();

    $cache_action = $_GET["action"] ?? "";
    $cache_id = $_GET["id"] ?? "";
    $cache_name = $cache_action . $cache_id;

    $cacheManager->cacheName($cache_name);
    $cacheManager->cacheFolder("department");

    if (!$cacheManager->existCache()) $department = new Department();

    switch ($_GET["action"]) {
        case 'get_department_info':
            if ($cacheManager->existCache()) {
                echo $cacheManager->getCache();
            } else {
                $response = Response::responseSelect($department->get_department_info());
                $cacheManager->createCache($response);
                echo $response;
            }
            break;

        case 'save_department_info':
            $cacheManager->removeCache();
            echo Response::responseInsert($department->save_department_info());
            break;
        case 'delete_department_info' :
            $cacheManager->removeCache();
            echo Response::responseDelete($department->delete_department_info());
            break;
    }
}
