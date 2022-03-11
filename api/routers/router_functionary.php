<?php

if (
    $_GET["action"] === "save_functionary" ||
    $_GET["action"] === "edit_functionary" ||
    $_GET["action"] === "delete_functionary" ||
    $_GET["action"] === "get_functionary"
) {

    $cacheManager = new CacheManager();

    $cache_action = $_GET["action"] ?? "";
    $cache_id = $_GET["id"] ?? "";
    $cache_department = $_GET["department_owner"] ?? "";
    $cache_name = $cache_action . $cache_id . $cache_department;

    $cacheManager->cacheName($cache_name);
    $cacheManager->cacheFolder("functionary");

    if (!$cacheManager->existCache()) $functionary = new Functionary();

    switch ($_GET["action"]) {
        case "save_functionary":
            $cacheManager->removeCache();
            echo Response::responseInsert($functionary->save_functionary());
            break;
        case "edit_functionary":
            $cacheManager->removeCache();
            echo Response::responseInsert($functionary->edit_functionary());
            break;
        case "get_functionary":
            if ($cacheManager->existCache()) {
                echo $cacheManager->getCache();
            } else {
                $response =  Response::responseSelect($functionary->get_functionary());
                $cacheManager->createCache($response);
                echo $response;
            }

            break;
        case "delete_functionary":
            $cacheManager->removeCache();
            echo Response::responseDelete($functionary->delete_functionary());
            break;
    }
}
