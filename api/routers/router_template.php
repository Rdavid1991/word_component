<?php

if (
    $_GET["action"] === "save_template_doc" ||
    $_GET["action"] === "edit_template_doc" ||
    $_GET["action"] === "get_template_doc" ||
    $_GET["action"] === "get_template_info" ||
    $_GET["action"] === "delete_template_doc"
) {

    $cacheManager = new CacheManager();

    $cache_action = $_GET["action"] ?? "";
    $cache_id = $_GET["id"] ?? "";
    $cache_department = $_GET["department_owner"] ?? "";
    $cache_name = $cache_action . $cache_id . $cache_department;

    $cacheManager->cacheName($cache_name);
    $cacheManager->cacheFolder("template");
    if (!$cacheManager->existCache()) $template = new DocTemplate();


    switch ($_GET["action"]) {
        case "save_template_doc":
            $cacheManager->removeCache();
            echo Response::responseInsert($template->save_template_doc());
            break;
        case "edit_template_doc":
            $cacheManager->removeCache();
            echo Response::responseInsert($template->edit_template_doc());
            break;

        case "get_template_info":

            if ($cacheManager->existCache()) {
                echo $cacheManager->getCache();
            } else {
                $response =  Response::responseSelect($template->get_template_info());
                $cacheManager->createCache($response);
                echo $response;
            }
            break;

        case "get_template_doc":
            $cacheManager->cacheName($cache_name);
            if ($cacheManager->existCache()) {
                echo $cacheManager->getCache();
            } else {
                $response =  Response::responseSelect($template->get_template_doc());
                $cacheManager->createCache($response);
                echo $response;
            }
            break;
        case "delete_template_doc":
            $cacheManager->removeCache();
            echo Response::responseDelete($template->delete_template_doc());
            break;
    }
}
