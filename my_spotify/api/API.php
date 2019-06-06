<?php
require_once('ArtistManager.php');
header("Access-Control-Allow-Origin: *");
$artist = new ArtistManager;

    if (isset($_GET['artists']) && !isset($_GET['id'])) {
        $list = $artist->getAllArtists();
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($rows);
        echo  $json;
    }
    else if (isset($_GET['artist']) && isset($_GET['id'])) {
        $list = $artist->getTheArtist($_GET['id']);
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($rows);
        echo  $json;
    }
    else if (isset($_GET['album']) && isset($_GET['id'])) {
        $list = $artist->getAlbumDetail($_GET['id']);
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $listgender = $artist->getAlbumGender($_GET['id']);
        $gender = $listgender->fetchAll(PDO::FETCH_ASSOC);
        $listTracks = $artist->getAlbumTracks($_GET['id']);
        $Tracks = $listTracks->fetchAll(PDO::FETCH_ASSOC);
        $result = array_merge($rows,$gender);
        $final = array_merge($result,$Tracks);
        $json = json_encode($final);
        echo  $json;
    }
    else if (isset($_GET['random'])) {
        $list = $artist->getRandomAlbums();
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($rows);
        echo  $json;
    }
    else if (isset($_GET['albums'])) {
        $list = $artist->getAllAlbums();
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($rows);
        echo  $json;
    }
    else if (isset($_GET['tracks']) && isset($_GET['id'])) {
        $list = $artist->getAlbumTracks($_GET['id']);
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($rows);
        echo  $json;
    }
    else if (isset($_GET['gender']) && !isset($_GET['id'])) {
        $list = $artist->getAllGender();
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($rows);
        echo  $json;
    }
    else if (isset($_GET['gender']) && isset($_GET['id'])) {
        $list = $artist->getAllAlbumFromGender($_GET['id']);
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($rows);
        echo  $json;
    }
    else if (isset($_GET['ArtistAlbums']) && isset($_GET['id'])) {
        $list = $artist->getAlbumFromArtist($_GET['id']);
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($rows);
        echo  $json;
    }
    else if (isset($_GET['creditArtist']) && isset($_GET['id'])) {
        $list = $artist->getArtistByAlbumID($_GET['id']);
        $rows = $list->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($rows);
        echo  $json;
    }
