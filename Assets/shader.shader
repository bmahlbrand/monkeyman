Shader "Custom/shader" {
	Properties {
		_Color ("Color", Color) = (1,1,1,1)
		_MainTex ("Albedo (RGB)", 2D) = "white" {}
		_Glossiness ("Smoothness", Range(0,1)) = 0.5
		_Metallic ("Metallic", Range(0,1)) = 0.0
		_HeightMin ("Height Min", Float) = -1
		_HeightMid ("Height Mid", Float) = 0
     	_HeightMax ("Height Max", Float) = 1
     	_ColorMin ("Tint Color At Min", Color) = (0,0,0,1)
     	_ColorMid ("Tint Color At Mid", Color) = (1,1,1,1)
     	_ColorMax ("Tint Color At Max", Color) = (1,1,1,1)
	}
	SubShader {
		Tags { "RenderType"="Opaque" }
		LOD 200
		
		CGPROGRAM
		// Physically based Standard lighting model, and enable shadows on all light types
		#pragma surface surf Standard fullforwardshadows

		// Use shader model 3.0 target, to get nicer looking lighting
		#pragma target 3.0

		sampler2D _MainTex;

		struct Input {
			float2 uv_MainTex;
			float3 worldPos;
		};
    
		half _Glossiness;
		half _Metallic;
		fixed4 _Color;
   	  	fixed4 _ColorMin;
   	  	fixed4 _ColorMid;
   	  	fixed4 _ColorMax;
   	  	float _HeightMin;
   	  	float _HeightMid;
   		float _HeightMax;
   		
		void surf (Input IN, inout SurfaceOutputStandard o) {
			// Albedo comes from a texture tinted by color
			fixed4 c = tex2D (_MainTex, IN.uv_MainTex);
			//o.Albedo = c.rgb;
			// Metallic and smoothness come from slider variables
			o.Metallic = _Metallic;
			o.Smoothness = _Glossiness;
			//o.Alpha = c.a;
			float h = (_HeightMax-IN.worldPos.y) / (_HeightMax-_HeightMin);
			fixed4 tintColor;
			
			if (IN.worldPos.y <= _HeightMax && IN.worldPos.y >= _HeightMid) {
				h = (_HeightMax-IN.worldPos.y) / (_HeightMax-_HeightMid);
       			tintColor = lerp(_ColorMax.rgba, _ColorMid.rgba, h);
       		} else if (IN.worldPos.y <= _HeightMid && IN.worldPos.y >= _HeightMin) {
       			h = (_HeightMid-IN.worldPos.y) / (_HeightMid-_HeightMin);
       			tintColor = lerp(_ColorMid.rgba, _ColorMin.rgba, h);
       		}
       		o.Albedo = c.rgb * tintColor.rgb;
       		o.Alpha = c.a * tintColor.a;
		}
		ENDCG
	} 
	FallBack "Diffuse"
}
