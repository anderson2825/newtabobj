 (function($){
   var Tab= function(that,config){
          var _this=this;
              _this.tab=that;
              _this.config=config;
              _this.defaults={
              	  type:"moseover",
              	  effect:'default',
              	  show:1,
              	  auto:false
              };

         if(_this.getConfig()&&_this.getConfig()!=null){
         	  $.extend(_this.defaults,_this.getConfig());
         } 

         _this.tabNav=_this.tab.find('.itemli');
         _this.tabCon=_this.tab.find('.contitem');
         _this.tabLeft=_this.tab.find('.tab_Left');
         _this.tabRight=_this.tab.find('.tab_Right');



         if(_this.defaults.type==='click'){
         	_this.tabNav.bind(_this.defaults.type,function(e){
                  _this.currentChange($(this));
            })
             _this.tabRight.bind(_this.defaults.type,function(){
             	 var tablen=_this.tabCon.size();
      	 	       _this.loop++;
      	 	  	  if(_this.loop>=tablen){
      	 	  	  	  _this.loop=0;
      	 	  	  }
      	 	  	  _this.currentChange(_this.tabNav.eq(_this.loop));
      	 	  })
              _this.tabLeft.bind(_this.defaults.type,function(){
             	 var tablen=_this.tabCon.size();
      	 	       if(_this.loop==0){
      	 	  	  	  _this.loop=tablen-1;
      	 	  	  }else{
      	 	  	  	_this.loop--;
      	 	  	  }
      	 	  	  _this.currentChange(_this.tabNav.eq(_this.loop));
             })
         }else{
         	_this.tabNav.bind("mouseover",function(e){
         		  _this.currentChange($(this));
         	})
         } 

         if(_this.defaults.auto){
         	  _this.timer=null;
         	  _this.loop=0;
         	  _this.autoplay(_this);
         	  _this.tab.hover(function(){
         	  	  clearInterval(_this.timer);
         	  },function(){
         	  	  _this.autoplay(_this);
         	  })
         } 

         if(_this.defaults.show!=1){
         	  _this.currentChange(_this.tabNav.eq(_this.defaults.show-1));
         }  
      };

      Tab.prototype={
      	 getConfig:function(){
      	 	var config= this.config;
      	 	if(!(config&&config!=null)){
      	 		  config=null;
      	 	}
      	 	return config;
      	 },

      	 currentChange:function(cur){
             var index=cur.index();
             cur.addClass("actived").siblings().removeClass("actived");
             if(this.defaults.effect==="default"){
             	this.tabCon.eq(index).addClass("actived").siblings().removeClass("actived");
             }else if(this.defaults.effect==="fade"){
               this.tabCon.eq(index).stop().fadeIn().siblings().stop().fadeOut();
             }
             if(this.defaults.auto){
             	  this.loop=index;
             }
      	 },
      	 autoplay:function(_this){
      	 	  var tablen=this.tabCon.size();
      	 	  this.timer=setInterval(function(){
      	 	  	  _this.loop++;
      	 	  	  if(_this.loop>=tablen){
      	 	  	  	  _this.loop=0;
      	 	  	  }
      	 	  	  _this.currentChange(_this.tabNav.eq(_this.loop));
      	 	  },this.defaults.auto);
      	 }
      };

      $.fn.extend({
      	  tab:function(config){
      	  	  this.each(function(){
      	  	  	  new Tab($(this),config|| null);
      	  	  });
      	  	  return this;
      	  }
      });


})(jQuery); 





 
 


 
