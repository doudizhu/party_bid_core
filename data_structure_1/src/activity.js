function Activity(activity_name){
    this.name =  activity_name
    this.sign_ups = []
    this.bids = []
}

Activity.prototype.create = function(){
    var activity_list = JSON.parse(localStorage.getItem('activities')) || []
    activity_list.push(this)
    localStorage.setItem('activities',JSON.stringify(activity_list))
}

Activity.prototype.active =function(){
    localStorage.setItem('current_activity',this.name)
}


