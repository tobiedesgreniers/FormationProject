import { Pipe, PipeTransform } from '@angular/core';
import { Sprint } from '../../../models/sprint.model'


@Pipe({
  name: 'filterWith'
})
export class FilterWithPipe implements PipeTransform {

  transform(sprints: Sprint[], term: string): Sprint[] {
    if (!sprints || !term) return sprints;

    term = term.toLowerCase();

    return sprints.filter(item =>{
      return JSON.stringify(item).toLowerCase().includes(term);
    });
}

}
