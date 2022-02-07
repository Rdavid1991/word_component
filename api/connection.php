<?php
define(
    "CONNECTION_INFO",
    array(
        'Database' => 'memos&notas',
        "UID" => "SA",
        "PWD" => "Abcd1234.",
        'CharacterSet' => 'UTF-8',
        'ReturnDatesAsStrings' => TRUE
    )
);

define("SERVER", "192.168.1.107");


class Connection
{
    protected $_db;
    public $_connected;

    function __construct()
    {
        $dbc = sqlsrv_connect(SERVER, CONNECTION_INFO);
        if ($dbc) {
            $this->_db = $dbc;
            $this->_connected = true;
        } else {
            $error = json_encode(sqlsrv_errors());
            error_log("Error de conexión de base de datos" . json_encode(sqlsrv_errors()));
            $this->_connected = false;
        }
    }

    function __destruct()
    {
        if ($this->_connected) {
            sqlsrv_close($this->_db);
        }
    }
}
?>