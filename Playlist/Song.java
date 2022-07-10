

public class Song {

	private String artist;
	private String title;

	public Song() {
		this.artist = null;
		this.title = null;
	}

	public Song(String artist, String title) {
		this.artist = artist;
		this.title = title;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String toString() {
		return this.artist + " " + this.title;
	}

	String getArtist() { return artist; }
	String getTitle() {return title; }
}
