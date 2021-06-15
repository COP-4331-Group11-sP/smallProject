<?php
class Database {

    public $dataBaby;
    public function getConnection(){

        $this->dataBaby = null;
        try{

            $this -> dataBaby = new mysqli("localhost", "PandaMan", "JackBlack2008", "PANDA");
        }catch(Exception $e){
            echo "Database could not be connected: " . $e->getMessage();
        }return $this->dataBaby;
        
    }

}