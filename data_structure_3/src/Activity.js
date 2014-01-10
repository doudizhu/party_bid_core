function Activity(activity_name){
    this.id = localStorage.activity_id_generator
    this.name = activity_name
}

Activity.prototype.create = function(){
    var activities = JSON.parse(localStorage.activities)
    activities.push(this)
    localStorage.activities = JSON.stringify(activities)

    localStorage.current_activity = localStorage.activity_id_generator
    localStorage.activity_id_generator = Number(localStorage.activity_id_generator)+1  //存整形变字符串
}