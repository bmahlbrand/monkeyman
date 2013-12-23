var Player : Transform;

 static var MoveSpeed = 4;

var MaxDist = 10;
var MinDist = 0;
 
function Start () 
{

}

function Update () 
{
 

 var Player = GameObject.FindWithTag("MainCamera").transform;
        transform.LookAt(Player.transform);
 
    if(Vector3.Distance(transform.position,Player.position) >= MinDist){
 
         transform.position += transform.forward*MoveSpeed*Time.deltaTime;
 
  
         if(Vector3.Distance(transform.position,Player.position) <= MaxDist)
             {Debug.Log("MoveSpeed");
                //Here Call any function U want Like Shoot at here or something

   } 

	
   }
 }	