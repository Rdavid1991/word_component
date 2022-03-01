<?php

class Message
{

    public static function success()
    {
        return json_encode((object) array(
            "title" => "Hecho",
            "text" => "Los datos se han guardado correctamente",
            "icon" => "success"
        ));
    }

    public static function successDelete()
    {
        return json_encode((object) array(
            "title" => "Hecho",
            "text" => "El registro se a borrado satisfactoriamente",
            "icon" => "success"
        ));
    }

    public static function errorDatabase($error)
    {
        return (object) array(
            "title" => "Error",
            "text" =>  $error,
            "icon" => "error"
        );
    }
}
