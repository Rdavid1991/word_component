<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once(dirname(__FILE__) . "/ManagementDB/ManagementDB.php");
require_once(dirname(__FILE__) . "/class/DocumentHistory.php");
require_once(dirname(__FILE__) . "/class/DocTemplate.php");
require_once(dirname(__FILE__) . "/class/Options.php");
require_once(dirname(__FILE__) . "/class/Addressee.php");


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

    public function save_document()
    {

        if (isset($_POST["type"])) {
            $type = $_POST["type"];
            $document = json_encode((object) [
                "body" => $_POST["body"],
                "footer" => $_POST["footer"],
                "header" => $_POST["header"]
            ]);

            $sql = "SELECT * FROM [dbo].[document] where [id] =" . $type;

            $result = parent::select_query($sql);

            if ($result) {
                $sql = "UPDATE [dbo].[document]
                SET [doc] = ?
                WHERE [id] = ?";

                $result = parent::insert_query($sql, [$document, $type]);
            } else {

                $sql = "INSERT INTO [dbo].[document] ([id],[doc])
                VALUES (?,?)";

                $result = parent::insert_query($sql, [$type, $document]);
            }

            if ($result) {
                $msj = (object) array(
                    "title" => "Hecho",
                    "text" => "Los datos se han guardado correctamente",
                    "icon" => "success"
                );
                echo  json_encode($msj);
            } else {
                $msj = (object) array(
                    "title" => "Oops!!!",
                    "text" => "A ocurrido un error.",
                    "icon" => "error"
                );
                echo  json_encode($msj);
            }
        } else {
            $msj = (object) array(
                "title" => "Algo salio mal",
                "text" => "no se puede guardar los datos, hacen falta parámetros",
                "icon" => 'warning'
            );
            echo  json_encode($msj);
        }
    }

    public function get_document()
    {

        $type = $_GET["type"];


        $sql = "SELECT * FROM [dbo].[document] where [id] ='" . $type . "'";

        $result = parent::select_query($sql);

        echo json_encode($result);
    }
}

$handler = new HandlerActionsMemo();
$document_history = new DocumentHistory();
$template = new DocTemplate();
$options = new Options();
$addressee = new Addressee();

switch ($_GET["action"]) {
    case "save_addressee":
        $addressee->save_addressee();
        break;
    case "edit_addressee":
        $addressee->edit_addressee();
        break;
    case "get_addressee":
        $addressee->get_addressee();
        break;
    case "delete_addressee":
        $addressee->delete_addressee();
        break;
    case "set_number":
        $document_history->find();
        break;
    case "get_type":
        $handler->get_document();
        break;
    case "save_document":
        $handler->save_document();
        break;
    case "get_reject_info":
        $handler->get_reject_info();
        break;
    case "reject_info":
        $document_history->reject_info();
        break;
    case "save_count_numbers":
        $result = $document_history->save_count_numbers($_POST["memo"], $_POST["note"]);
        echo json_encode($result);
        break;
    case "get_count_numbers":
        $result = $document_history->get_count_numbers();
        echo json_encode([
            "data" => $result
        ]);
        break;
    case "save_template_doc":
        $template->save_template_doc();
        break;
    case "edit_template_doc":
        $template->edit_template_doc();
        break;
    case "get_template_doc":
        $template->get_template_doc();
        break;
    case "delete_template_doc":
        $template->delete_template_doc();
        break;
    case "get_options_department_owner":
        $options->get_department_owner();
        break;

    default:

        break;
}
