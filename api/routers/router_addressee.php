<?php

if (
    $_GET["action"] === "save_addressee" ||
    $_GET["action"] === "edit_addressee" ||
    $_GET["action"] === "get_addressee" ||
    $_GET["action"] === "delete_addressee"
) {

    $cacheManager = new CacheManager();

    $cache_action = $_GET["action"] ?? "";
    $cache_id = $_GET["id"] ?? "";
    $cache_department = $_GET["department_owner"] ?? "";
    $cache_name = $cache_action . $cache_id . $cache_department;

    $cacheManager->cacheName($cache_name);
    $cacheManager->cacheFolder("addressee");

    if (!$cacheManager->existCache()) $addressee = new Addressee();

    switch ($_GET["action"]) {
        case "save_addressee":
            $cacheManager->removeCache();
            echo Response::responseInsert($addressee->save_addressee());
            break;
        case "edit_addressee":
            $cacheManager->removeCache();
            echo Response::responseInsert($addressee->edit_addressee());
            break;
        case "get_addressee":
            if ($cacheManager->existCache()) {
                echo $cacheManager->getCache();
            } else {
                $response = Response::responseSelect($addressee->get_addressee());
                $cacheManager->createCache($response);
                echo $response;
            }

            break;
        case "delete_addressee":
            $cacheManager->removeCache();
            echo Response::responseDelete($addressee->delete_addressee());
            break;
    }
}
