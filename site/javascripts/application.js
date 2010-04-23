$(document).ready(function() {
  persistence.schemaSync(function (tx) {
  });  
  
  all_tasks = Task.all();
  all_tasks.list(null, function(results){
    if(results.length === 0){init_tasks();}else{console.log('already has tasks')}
    results.forEach(function (r) {
      task = task_element(r);
      if(r.done === true){
        $('.tasks_done > .content').append(task);
      }else{
        $('.task_list > .content').append(task);
      }
    });
  });
      
  $('#task_form').submit(function(){
    task = new Task($(this).serializeObject());
    persistence.add(task);
    console.log('added form task');
    $('.task_list > .content').append(task_element(task));
    persistence.flush(null, function() {
    });
    return false;
  });
  
  $(".task_list > .content > .task > .checkbox > input[type='checkbox']").live('change' , function(ev){
    target = $(ev.target);
    Task.all().filter('id' , '=' , target.attr('value')).limit(1).list(null, function(results){
      results.forEach(function(r){
        r.done = true;
        persistence.add(r);
      })
    })
    persistence.flush();
    $('.tasks_done > .content').append(target.parents('.task'));
  })
  
  $(".tasks_done > .content > .task > .checkbox > input[type='checkbox']").live('change' , function(ev){
    target = $(ev.target);
    Task.all().filter('id' , '=' , target.attr('value')).limit(1).list(null, function(results){
      results.forEach(function(r){
        r.done = false;
        persistence.add(r);
      })
    })
    persistence.flush();
    $('.task_list > .content').append(target.parents('.task'));
  });
  
  $(".content > .task > .delete_link").live('click' , function(ev){
    target = $(ev.target);
    task_e = target.parents('.task');
    Task.all().filter('id' , '=' , task_e.attr('id')).limit(1).list(null, function(results){
      results.forEach(function(r){
        persistence.remove(r);
      })
    })
    persistence.flush();
    task_e.remove();
  });
  
});

function init_tasks(){
  t = new Task( {
     name: "Main" ,
    description: "Urgent"
  });
  persistence.add(t); 
  console.log('added default task') ;
  persistence.flush(null, function() {
  });
}

function task_element(r){
  task_e = $('<div class="task" id='+r.id+'></div>');
  
  task_e.append($('<div class="name">'+r.name+'</div>'));
  task_e.append($('<div class="description">'+r.description+'</div>'));
  check_box = $('<div class="checkbox"><input type="checkbox" value="'+ r.id +'"  /></div>');
  task_e.append(check_box);
  task_e.append($('<a href="#" class="delete_link" >delete(-)</a>'));
  return task_e;
};

//UTILS
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

