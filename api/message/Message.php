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
}
