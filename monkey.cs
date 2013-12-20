using UnityEngine;
using System.Collections;


public class monkey : MonoBehaviour
{
    public int points = 1; // You can edit this in the inspector
 
    void OnDestroy()
    {
        score.points += points;
    }
}