function DidPause (pause : boolean)
{
	if (GetComponent.<GUITexture>())
		GetComponent.<GUITexture>().enabled = !pause;
	if (GetComponent.<GUIText>())
		GetComponent.<GUIText>().enabled = !pause;
}
