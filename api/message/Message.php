<?php

class Message
{

    public static function successSaved()
    {
        return (object) array(
            "title" => "Hecho",
            "text" => "Los datos se han guardado correctamente",
            "icon" => "success"
        );
    }

    public static function successDelete()
    {
        return (object) array(
            "title" => "Hecho",
            "text" => "El registro se a borrado satisfactoriamente",
            "icon" => "success"
        );
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
