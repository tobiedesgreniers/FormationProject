import { Pipe, PipeTransform } from '@angular/core';
import { Sprint } from '../../../models/sprint.model'


@Pipe({
  name: 'filterWith'
})
export class FilterWithPipe implements PipeTransform {

  transform(sprints: Sprint[], term: string): Sprint[] {
    //Return normal array if nothing to search with or if error about term or sprints array
    if (!sprints || !term) return sprints;

    //Making sure the search isn't case sensitive
    term = term.toLowerCase();

    //Algorithm to see if anything in all sprints includes the term.
    //This algorithm search in every key of the sprints
    return sprints.filter(item =>{
      return JSON.stringify(item).toLowerCase().includes(term);
    });
}

}
