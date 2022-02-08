<?php
header("Access-Control-Allow-Origin: */");
header("Access-Control-Allow-Headers: */");

require_once(dirname(__FILE__) . "/connection.php");

class ManagementDB extends Connection
{

    public function __construct()
    {
        parent::__construct();
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    protected function insert_query(string $sql_query, array $params, &$numRows = "")
    {
        if (sqlsrv_begin_transaction($this->_db) === false) {
            return false;
        };

        $query_result = sqlsrv_query($this->_db, $sql_query, $params);

        if ($query_result) {
            $numRows = sqlsrv_rows_affected($query_result);
            sqlsrv_commit($this->_db);
            return true;
        }
        error_log("Error en base de datos: " . json_encode(sqlsrv_errors()));
        $errorinsert = json_encode(sqlsrv_errors());
        sqlsrv_rollback($this->_db);
        return false;
    }

    protected function select_query(string $sql_query, $params = array())
    {
        $array_items = array();

        $query_result = sqlsrv_query($this->_db, $sql_query, $params);

        if ($query_result) {

            while ($row = sqlsrv_fetch_array($query_result, SQLSRV_FETCH_ASSOC)) {
                $array_items[] = (object)  $row;
            }

            sqlsrv_free_stmt($query_result);
            return (sizeof($array_items) > 1 ? $array_items : (sizeof($array_items) ? $array_items[0] : null));
        }
        error_log("Error en base de datos: " . json_encode(sqlsrv_errors()));
        $errorselect = json_encode(sqlsrv_errors());
        return false;
    }
}

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
        }
    }

    public function find()
    {

        $count_number = $this->get_count_numbers();

        if (intval($_GET["type"]) === 1) {

            $sql = "UPDATE [dbo].[memo]
            SET [state] = 0
            WHERE [state] = 1";

            parent::insert_query($sql, []);

            $dirigido = $_POST["dirigido"];
            $asunto = $_POST["asunto"];
            $solicitado = $_POST["solicitado"];

            $sql = "INSERT INTO [dbo].[memo]
           ([asunto]
           ,[solicitado_por]
           ,[dirigido_a]
           ,[number]
           ,[state])
            VALUES
           (
               ?,
               ?,
               ?,
               ?,
               ?
               )";

            $result = parent::insert_query($sql, [$asunto, $solicitado, $dirigido,   $count_number->memorandum, 1]);

            if ($result) {
                $this->save_count_numbers(($count_number->memorandum + 1), $count_number->notes);
            }

            echo json_encode((object) ["id" => $count_number->memorandum]);
        }else if (intval($_GET["type"]) === 2) {
            $sql = "UPDATE [dbo].[note]
            SET [state] = 0
            WHERE [state] = 1";

            parent::insert_query($sql, []);

            $dirigido = $_POST["dirigido"];
            $asunto = $_POST["asunto"];
            $solicitado = $_POST["solicitado"];

            $sql = "INSERT INTO [dbo].[note]
           ([asunto]
           ,[solicitado_por]
           ,[dirigido_a]
           ,[number]
           ,[state])
            VALUES
           (
               ?,
               ?,
               ?,
               ?,
               ?
               )";

            $result = parent::insert_query($sql, [$asunto, $solicitado, $dirigido,   $count_number->notes, 1]);

            if ($result) {
                $this->save_count_numbers(($count_number->memorandum), $count_number->notes + 1);
            }

            echo json_encode((object) ["id" => $count_number->notes]);
        }
    }

    public function save_document()
    {

        if (isset($_POST["document"]) && isset($_POST["type"])) {
            $type = $_POST["type"];
            $document = $_POST["document"];

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

    public function set_addressee()
    {
        if (isset($_POST["name"]) && isset($_POST["jobTitle"]) && isset($_POST["archetype"]) && isset($_POST["department"])) {

            $sql = "INSERT INTO [dbo].[addressee] ([name],[jobTitle],[archetype],[department])
            VALUES  (?,?,?,?)";

            $result = parent::insert_query($sql, [
                $_POST["name"],
                $_POST["jobTitle"],
                $_POST["archetype"],
                $_POST["department"]
            ]);

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

    public function get_addressee()
    {

        $sql = "SELECT * FROM [dbo].[addressee]";

        $result = parent::select_query($sql);

        echo json_encode($result);
    }

    public function reject_info()
    {

        if (intval($_GET["type"]) === 1) {

            $update = "UPDATE [dbo].[memo]
            SET [state] = 3
            WHERE [number] = ?";

            $result = parent::insert_query($update, [$_GET["info"]]);

            if ($result) {
                $count_number = $this->get_count_numbers();
                $this->save_count_numbers((intval($_GET["info"])), $count_number->notes);

                $msj = (object) array(
                    "title" => "Hecho",
                    "text" => "Se a rechazado el memo numero" . $_GET["info"],
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
        } else if (intval($_GET["type"]) === 2) {
            $update = "UPDATE [dbo].[note]
            SET [state] = 3
            WHERE [number] = ?";

            $result = parent::insert_query($update, [$_GET["info"]]);

            if ($result) {
                $count_number = $this->get_count_numbers();
                $this->save_count_numbers($count_number->memo, intval($_GET["info"]));

                $msj = (object) array(
                    "title" => "Hecho",
                    "text" => "Se a rechazado el memo numero" . $_GET["info"],
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
        }
    }

    public function save_count_numbers($memo, $note)
    {
        $result = $this->get_count_numbers();
        if ($result) {
            $update = "UPDATE [dbo].[number_memo_notes]
                        SET [memorandum] = ? ,[notes] = ?
                        WHERE [id] = ?";
            $result = parent::insert_query($update, [$memo, $note, $result->id]);
            if ($result) {
                return (object) array(
                    "title" => "Hecho",
                    "text" => "Se ha guardado la información correctamente",
                    "icon" => "success"
                );
            } else {
                return (object) array(
                    "title" => "Oops!!!",
                    "text" => "A ocurrido un error.",
                    "icon" => "error"
                );
            }
        } else {
            $update = "INSERT INTO [dbo].[number_memo_notes]([memorandum],[notes])
                        VALUES(?,?)";
            $result = parent::insert_query($update, [$_POST["memo"], $_POST["note"]]);
            if ($result) {
                return (object) array(
                    "title" => "Hecho",
                    "text" => "Se ha guardado la información correctamente",
                    "icon" => "success"
                );
            } else {
                return (object) array(
                    "title" => "Oops!!!",
                    "text" => "A ocurrido un error.",
                    "icon" => "error"
                );
            }
        }
    }

    public function get_count_numbers()
    {
        $sql = "SELECT * FROM [dbo].[number_memo_notes]";
        return parent::select_query($sql);
    }
}

$handler = new HandlerActionsMemo();

switch ($_GET["action"]) {
    case "save_addressee":
        $handler->set_addressee();
        break;
    case "get_addressee":
        $handler->get_addressee();
        break;
    case "set_number":
        $handler->find();
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
        $handler->reject_info();
        break;
    case "save_count_numbers":
        $result = $handler->save_count_numbers($_POST["memo"], $_POST["note"]);
        echo json_encode($result);
        break;
    case "get_count_numbers":
        $result = $handler->get_count_numbers();
        echo json_encode($result);
        break;

    default:

        break;
}
