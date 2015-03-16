private var show = false;

function Update () {
	if (Input.GetKeyDown("0"))
		show = !show;
	if (show)
	{
		if (Time.timeScale != 0.0)
		{
			var fps : int = 1.0 / Time.deltaTime;
			GetComponent.<GUIText>().text = fps.ToString();
		}
		else
		{
			GetComponent.<GUIText>().text = "0";
		}
	}
	else
	{
		GetComponent.<GUIText>().text = "";	
	}
}

@script RequireComponent(GUIText)