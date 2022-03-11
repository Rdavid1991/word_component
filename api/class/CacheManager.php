<?php

class CacheManager
{

    protected $cache, $name, $folder = null;
    protected $path;

    function __construct()
    {
        $this->path = dirname(__DIR__) . "/tmp/";
    }

    protected function getCacheName()
    {
        $folder = $this->folder ? $this->folder . "/" : "";
        return $this->path . $folder . $this->name;
    }

    public function cacheName($department)
    {
        $this->name = md5($department) . ".txt";
    }

    public function cacheFolder($folder)
    {
        if (!is_dir($this->path . $folder)) {
            mkdir($this->path . $folder);
        }

        $this->folder = $folder;
    }

    public function getCache()
    {
        if (self::existCache()) {
            return file_get_contents(self::getCacheName());
        }
    }

    public function createCache($cache)
    {

        if (!self::existCache()) {
            $file = fopen(self::getCacheName(), "x");
            fwrite($file, $cache);
            fclose($file);
        }
    }


    public function existCache()
    {
        return file_exists(self::getCacheName());
    }

    public function removeCache()
    {
        $files = glob($this->path . $this->folder . '/*');

        foreach ($files as $file) {

            if (is_file($file)) {

                unlink($file);
            }
        }
    }
}
