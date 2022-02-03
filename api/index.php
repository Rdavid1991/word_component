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
            return sizeof($array_items) > 1 ? $array_items : $array_items[0];
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

        echo $result;
    }

    public function get_document()
    {

        $type = $_POST["type"];


        $sql = "SELECT * FROM [dbo].[document] where [id] ='" . $type . "'";

        $result = parent::select_query($sql);

        echo json_encode($result);
    }
}

$handler = new HandlerActionsMemo();

if (isset($_GET["element"])) {
    $handler->getReject();
} else if (isset($_POST["document"]) && isset($_POST["type"])) {
    $handler->save_document();
} else if (isset($_GET["type"])) {
    $handler->get_document();
} else {

    $handler->find();
}
