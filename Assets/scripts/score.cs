using UnityEngine;
using System.Collections;

public class score : MonoBehaviour {
    public GUISkin guiSkin = null;
    public static int points = 0;
  	//public Spawner script;
   // void Example() {
   //     script = GetComponent("MasterSpawnScript") as ScriptName;
   //     script.waveNumber();
  //  }
    void OnGUI()
    {
        GUI.skin = guiSkin;
        GUI.Label(new Rect(25,25, 200f, 38.0f), points.ToString());
		//GUI.Label(new Rect(0.0f, 0.0f, 550.0f, 32.0f), MasterSpawnScript.ToString());
		
        GUI.skin = null;
		
    }
}