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

    public function getReject()
    {
        $sql = "SELECT *
          FROM [dbo].[memo] 
          WHERE [last] = 1 AND [id] = " . $_GET["element"];

        $result = parent::select_query($sql);
        echo json_encode($result);
    }

    public function find()
    {


        $sql = "SELECT *
          FROM [dbo].[memo] 
          WHERE [last] = 1";

        $result = parent::select_query($sql);

        if ($result) {
            $update = "UPDATE [dbo].[memo]
            SET [last] = 0
            WHERE [last] = ?";

            $result = parent::insert_query($update, [1]);
        }

        $dirigido = $_POST["dirigido"];
        $asunto = $_POST["asunto"];
        $solicitado = $_POST["solicitado"];

        $sql = "INSERT INTO [dbo].[memo]
           ([asunto]
           ,[solicitado_por]
           ,[dirigido_a]
           ,[last])
        VALUES
           (
               ?,
               ?,
               ?,
               ?
               )";

        $result = parent::insert_query($sql, [$dirigido, $asunto, $solicitado, 1]);

        $sql = "SELECT id
        FROM [dbo].[memo] 
        WHERE [last] = 1";

        $result = parent::select_query($sql);

        echo json_encode($result);

        //http_response_code(202);
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

    default:
        if (isset($_GET["element"])) {
            $handler->getReject();
        } else if (isset($_GET["type"])) {
        } else {
        }
        break;
}
