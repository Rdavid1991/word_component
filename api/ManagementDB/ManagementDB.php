<?php
require_once(dirname(__FILE__) . "/../connection.php");

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
            return ["isSuccess" => true];
        }
        $error = sqlsrv_errors();
        sqlsrv_rollback($this->_db);
        return ["isSuccess" => false, "error" => "Error al insertar datos " . $error[0]["message"]];
    }

    protected function select_query(string $sql_query, $params = array())
    {
        $array_items = array();

        $query_result = sqlsrv_query($this->_db, $sql_query, $params);

        if ($query_result) {

            while ($row = sqlsrv_fetch_array($query_result, SQLSRV_FETCH_ASSOC)) {
                $array_items[] = (object) $row;
            }

            sqlsrv_free_stmt($query_result);
            return ["isSuccess" => true , "data" => $array_items];
        }
        error_log("Error en base de datos: " . json_encode(sqlsrv_errors()));
        $error = sqlsrv_errors();
        return ["isSuccess" => false , "error" => "Error al insertar datos " . $error[0]["message"]];
    }
}
