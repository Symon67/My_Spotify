<?php
require_once('Database.php');
class ArtistManager extends Database {
    private $_db;

    public function __construct()
	{
		$this->_db = $this->dbConnect();

    }

    public function getRandomAlbums()
    {
        $rand = rand(1,1625);
        $randPlus = $rand + 23;
        $data = $this->_db->prepare('SELECT albums.id AS albumid, albums.artist_id AS albumArtistId, albums.name AS albumName, albums.description AS albumDescription,albums.cover AS albumCover, albums.cover_small AS albumCover_small, albums.release_date AS albumReleaseDate, albums.popularity AS AlbumPopularity, artists.id AS artistId, artists.name AS artistName, artists.description AS artistDescription, artists.bio AS artistsBIo, artists.photo AS artist_photo FROM artists INNER JOIN albums ON albums.artist_id = artists.id WHERE albums.id BETWEEN ? AND ?');
        $data->execute([$rand,$randPlus]);
        return $data;
    }

    public function getAllArtists()
    {
        $data = $this->_db->prepare('SELECT * FROM artists');
        $data->execute();
        return $data;
    }
    public function getTheArtist($id)
    {
        $data = $this->_db->prepare('SELECT * FROM artists WHERE id = ?');
        $data->execute([$id]);
        return $data;
    }

    public function getAllAlbums()
    {
        $data = $this->_db->prepare('SELECT albums.id AS albumid, albums.artist_id AS albumArtistId, albums.name AS albumName, albums.description AS albumDescription,albums.cover AS albumCover, albums.cover_small AS albumCover_small, albums.release_date AS albumReleaseDate, albums.popularity AS AlbumPopularity,  artists.id AS artistId, artists.name AS artistName, artists.description AS artistDescription, artists.bio AS artistsBIo, artists.photo AS artist_photo FROM artists INNER JOIN albums ON albums.artist_id = artists.id
        ');
        $data->execute();
        return $data;
    }

    public function getAlbumDetail($id)
    {
        $data = $this->_db->prepare('SELECT * from albums WHERE id = ? ');
        $data->execute([$id]);
        return $data;
    }

    public function  getAlbumGender($id)
    {
        $data = $this->_db->prepare('SELECT genres.name AS genres FROM genres_albums INNER JOIN genres ON genres.id = genres_albums.genre_id WHERE genres_albums.album_id = ?
        ');
        $data->execute([$id]);
        return $data;
    }

    public function getAlbumTracks($id)
    {
        $data = $this->_db->prepare('SELECT * FROM tracks WHERE album_id = ?');
        $data->execute([$id]);
        return $data;
    }

    public function getAllGender()
    {
        $data = $this->_db->prepare('SELECT * FROM genres');
        $data->execute();
        return $data;
    }

    public function getAllAlbumFromGender($idGender)
    {
        $data = $this->_db->prepare('SELECT albums.id AS albumid, albums.artist_id AS albumArtistId, albums.name AS albumName, albums.description AS albumDescription,albums.cover AS albumCover, albums.cover_small AS albumCover_small, albums.release_date AS albumReleaseDate, albums.popularity AS AlbumPopularity, genres.name AS genreName FROM genres INNER JOIN genres_albums ON genres_albums.genre_id = genres.id INNER JOIN albums ON albums.id = genres_albums.album_id WHERE genres.id = ?
        ');
        $data->execute([$idGender]);
        return $data;
    }

    public function getAlbumFromArtist($idArtist)
    {
        $data = $this->_db->prepare('SELECT * FROM albums WHERE artist_id = ?');
        $data->execute([$idArtist]);
        return $data;
    }

    public function getArtistByAlbumID($idAlbum)
    {
        $data =$this->_db->prepare('SELECT artists.name, artists.id FROM albums INNER JOIN artists ON artists.id = albums.artist_id WHERE albums.artist_id = ?
        LIMIT 1');
        $data->execute([$idAlbum]);
        return $data;
    }
}