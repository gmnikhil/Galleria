import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
Images=new Mongo.Collection("images")
Images.allow({
	insert:function(userId,doc) {
		if(Meteor.user()){
		return true;	
		}
		else
			return false
	 
	},
	remove:function(userId,doc) {
		if(Meteor.user()){
		return true;	
		}
		else
			return false;
	}
})


if(Meteor.isServer){
	Meteor.startup(function(){
		if(Images.find().count()==0){
			
			Images.insert({img_src:"img_"+1+".jpg",img_alt:"Some Flowers to cheer up!",id:"123",caption:"Flora",createdOn:new Date(),createdBy:"Nikhil"});
			Images.insert({img_src:"img_"+2+".jpg",img_alt:"Aawwwww cute!",id:"124",caption:"Lion cubs",createdOn:new Date(),createdBy:"Mike"});
			Images.insert({img_src:"img_"+3+".jpg",img_alt:"Leaves and more leaves!",id:"125",caption:"Autumn",createdOn:new Date(),createdBy:"Nikhil"});
			Images.insert({img_src:"img_"+4+".jpg",img_alt:"No messing around!",id:"126",caption:"Great Cat",createdOn:new Date(),createdBy:"Nikhil"});
			Images.insert({img_src:"img_"+5+".jpg",img_alt:"Nature at its best",id:"127",caption:"Waterfall",createdOn:new Date(),createdBy:"Nikhil"});
			
		}
	});

	
}
  // code to run on server at startup
if(Meteor.isClient){
	console.log(Images.find());
	Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });
	
	Template.images.helpers({images:Images.find({},{sort:{createdOn: -1}})});
	Template.images.events({
		'click .js-delete':function(event){
			if(Meteor.user()) {
			Images.remove(this._id);
		}
			else 
			$('#Modal-2').modal('show');	
		},
		'click .js-view':function(event){
			        	console.log(this);
			        	var x=document.getElementById(this._id);
			        	console.log(x);
	  	}
	});
	Template.addimg.events({
		'submit .js-add-image':function(event){
			var src=event.target.src.value;
			var caption=event.target.caption.value;
			var alt=event.target.alt.value;
			if(Meteor.user())
				Images.insert({caption:caption,img_src:src,img_alt:alt,createdOn:new Date(),
            createdBy:Meteor.user().username,id:Meteor.user()._id});
			else 
				$('#Modal-1').modal('show');
			$('#exampleModal').modal('hide');
			return false;

		}
	})
}
       

