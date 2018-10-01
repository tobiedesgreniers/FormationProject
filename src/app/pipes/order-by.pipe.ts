import { Pipe, PipeTransform } from '@angular/core';
import { Sprint } from '../../../models/sprint.model'


@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(sprints: Sprint[], path: string[], order: number): Sprint[] {
    if (!sprints || !path || !order) return sprints;

    return sprints.sort((a: Sprint, b: Sprint) => {
      path.forEach(property => {
        a = a[property];
        b = b[property]
      })

      return a > b ? order: order * (-1);
    })
  }
}
