<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once(dirname(__FILE__) . "/ManagementDB/ManagementDB.php");
require_once(dirname(__FILE__) . "/class/DocumentHistory.php");
require_once(dirname(__FILE__) . "/class/DocTemplate.php");
require_once(dirname(__FILE__) . "/class/Options.php");
require_once(dirname(__FILE__) . "/class/Addressee.php");
require_once(dirname(__FILE__) . "/class/Functionary.php");
require_once(dirname(__FILE__) . "/class/Consecutive.php");
require_once(dirname(__FILE__) . "/class/CacheManager.php");


require_once(dirname(__FILE__) . "/routers/router_template.php");
require_once(dirname(__FILE__) . "/routers/router_functionary.php");
require_once(dirname(__FILE__) . "/routers/router_addressee.php");


class HandlerActionsMemo extends ManagementDB
{

    public function __construct()
    {
        parent::__construct();
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    public function get_reject_info()
    {
        if (intval($_GET["type"]) === 1) {
            $sql = "SELECT *
              FROM [dbo].[memo] 
              WHERE [state] = 1 AND [number] = " . $_GET["info"];

            $result = parent::select_query($sql);
            echo json_encode($result);
        } else {
            if (intval($_GET["type"]) === 2) {
                $sql = "SELECT *
                  FROM [dbo].[note] 
                  WHERE [state] = 1 AND [number] = " . $_GET["info"];

                $result = parent::select_query($sql);
                echo json_encode($result);
            }
        }
    }
}

class Response
{
    public static function responseInsert($result)
    {
        if ($result["isSuccess"]) {
            return json_encode((object) ["message" => Message::successSaved()]);
        } else {
            http_response_code(500);
            return json_encode((object)["message" => Message::errorDatabase($result["error"])]);
        }
    }

    public static function responseSelect($result)
    {
        if ($result["isSuccess"]) {
            return json_encode((object) ["data" => $result["data"]]);
        } else if (!$result["isSuccess"]) {
            http_response_code(500);
            return json_encode(["message" => Message::errorDatabase($result["error"])]);
        }
    }

    public static function responseDelete($result)
    {
        if ($result["isSuccess"]) {
            return json_encode((object) ["message" => Message::successDelete()]);
        } else {
            http_response_code(500);
            return json_encode((object)["message" => Message::errorDatabase($result["error"])]);
        }
    }
}


if (
    $_GET["action"] === "save_count_numbers" ||
    $_GET["action"] === "get_count_numbers"
) {

    $consecutive = new Consecutive();

    switch ($_GET["action"]) {
        case "save_count_numbers":
            echo Response::responseInsert($consecutive->save_count_numbers($_POST["memo"], $_POST["note"]));
            break;
        case "get_count_numbers":
            echo Response::responseSelect($consecutive->get_count_numbers());
            break;
    }
}

if (
    $_GET["action"] === "set_number" ||
    $_GET["action"] === "reject_info"
) {

    $document_history = new DocumentHistory();

    switch ($_GET["action"]) {
        case "set_number":
            $document_history->find();
            break;
        case "reject_info":
            $document_history->reject_info();
            break;
    }
}

if (
    $_GET["action"] === "get_reject_info" ||
    $_GET["action"] === "get_options_department_owner"
) {

    $cacheManager = new CacheManager();

    $cache_action = $_GET["action"] ?? "";
    $cache_id = $_GET["id"] ?? "";
    $cache_department = $_GET["department_owner"] ?? "";
    $cache_name = $cache_action . $cache_id . $cache_department;

    $cacheManager->cacheName($cache_name);


    $handler = new HandlerActionsMemo();

    switch ($_GET["action"]) {
        case "get_reject_info":
            $handler->get_reject_info();
            break;
        case "get_options_department_owner":
            if (isset($_GET["id"]) && $_GET["id"] !== "0" && $cacheManager->existCache()) {
                echo $cacheManager->getCache();
            } else {
                $options = new Options();
                $response = Response::responseSelect($options->get_department_owner());
                $cacheManager->createCache($response);
                echo $response;
            }

            break;
        default:
            break;
    }
}
