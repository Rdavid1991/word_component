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


/**
 * Manejo de plantillas 
 */
if (
    $_GET["action"] === "save_template_doc" ||
    $_GET["action"] === "edit_template_doc" ||
    $_GET["action"] === "get_template_doc" ||
    $_GET["action"] === "get_template_info" ||
    $_GET["action"] === "delete_template_doc"
) {

    $template = new DocTemplate();

    switch ($_GET["action"]) {
        case "save_template_doc":
            echo Response::responseInsert($template->save_template_doc());
            break;
        case "edit_template_doc":
            echo Response::responseInsert($template->edit_template_doc());
            break;
        case "get_template_info":
            echo Response::responseSelect($template->get_template_info());
            break;
        case "get_template_doc":
            echo Response::responseSelect($template->get_template_doc());
            break;
        case "delete_template_doc":
            echo Response::responseDelete($template->delete_template_doc());
            break;
    }
}


if (
    $_GET["action"] === "save_functionary" ||
    $_GET["action"] === "edit_functionary" ||
    $_GET["action"] === "delete_functionary" ||
    $_GET["action"] === "get_functionary"
) {
    $functionary = new Functionary();
    switch ($_GET["action"]) {
        case "save_functionary":
            echo Response::responseInsert($functionary->save_functionary());
            break;
        case "edit_functionary":
            echo Response::responseInsert($functionary->edit_functionary());
            break;
        case "get_functionary":
            echo Response::responseSelect($functionary->get_functionary());
            break;
        case "delete_functionary":
            echo Response::responseDelete($functionary->delete_functionary());
            break;
    }
}

if (
    $_GET["action"] === "save_addressee" ||
    $_GET["action"] === "edit_addressee" ||
    $_GET["action"] === "get_addressee" ||
    $_GET["action"] === "delete_addressee"
) {
    $addressee = new Addressee();

    switch ($_GET["action"]) {
        case "save_addressee":
            echo Response::responseInsert($addressee->save_addressee());
            break;
        case "edit_addressee":
            echo Response::responseInsert($addressee->edit_addressee());
            break;
        case "get_addressee":
            echo Response::responseSelect($addressee->get_addressee());
            break;
        case "delete_addressee":
            echo Response::responseDelete($addressee->delete_addressee());
            break;
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
    $_GET["action"] ==="get_reject_info" ||
    $_GET["action"] ==="get_options_department_owner"
) {
    $handler = new HandlerActionsMemo();
    $options = new Options();
    switch ($_GET["action"]) {
        case "get_reject_info":
            $handler->get_reject_info();
            break;
        case "get_options_department_owner":
            $options->get_department_owner();
            break;
        default:
            break;
    }
}
