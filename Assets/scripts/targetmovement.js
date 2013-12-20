   function Update () {
        // Set the x position to loop between 0 and 3
        transform.position = Vector3(
                     Mathf.PingPong(Time.time, 5), transform.position.y, transform.position.z);
    }