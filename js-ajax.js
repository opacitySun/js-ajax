(function(){
	function Ajax(options){
		//格式化参数
		this.formatParams = function(data){
			var arr = [];
	        for (var name in data) {
	            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
	        }
	        arr.push(("v=" + Math.random()).replace(".",""));
	        return arr.join("&");
		}

		//获取参数
		options = options || {};
		options.type = (options.type || "GET").toUpperCase();
		options.dataType = options.dataType || "json";
		options.async = options.async || true;
		var params = this.formatParams(options.data);

		//第一步：创建XMLHttpRequest对象
		var XMLHttpReq;
		try{
			XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			}catch{
				XMLHttpReq = new XMLHttpRequest();
			}
		}

		//第二步：连接和发送
		if(options.type == "GET"){
			XMLHttpReq.open("GET",options.url + "?" + params,options.async);
			XMLHttpReq.send(null);
		}else if(options.type == "POST"){
			XMLHttpReq.open("POST",options.url,options.async);
			XMLHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			XMLHttpReq.send(params);
		}

		//第三步：接收
		XMLHttpReq.onreadystatechange = function(){
			if(XMLHttpReq.readyState == 4){
				var status = XMLHttpReq.status;
				if(status >= 200 && status < 300){
					options.success && options.success(XMLHttpReq.responseText,XMLHttpReq.responseXML);
				}else{
					options.error && options.error(status);
				}
			}
		}
	}

	/*
	//使用事例
	Ajax({
		url:"",
		type:"GET",
		async:true
		dataType:"json",
		data:{"name":"sun","age":26},
		success:function(response,xml){
	
		},
		error:function(status){
			
		}
	});
	*/
})();