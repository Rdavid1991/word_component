<?php

require_once(dirname(__FILE__)."/message/Message.php");

define(
    "CONNECTION_INFO",
    array(
        'Database' => 'db_plantillas',
        "UID" => "SA",
        "PWD" => "Abcd1234.",
        'CharacterSet' => 'UTF-8',
        'ReturnDatesAsStrings' => TRUE,
        "LoginTimeout" => 5
    )
);

define("SERVER", "localhost");


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
            $arrayError = sqlsrv_errors();
            $error = "No se pudo conectar a la base de datos: ".$arrayError[0]["message"];
            echo json_encode((object) ["message" => Message::errorDatabase($error)]);
            http_response_code(500);
            exit();
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