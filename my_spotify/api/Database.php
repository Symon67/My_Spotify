<?php

class Database{
    protected function dbConnect()
    {
        $db = new PDO('mysql:host=localhost;dbname=spotify;charset=utf8', 'root', '');
		return $db;
    }
}