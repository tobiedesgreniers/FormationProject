import { Pipe, PipeTransform } from '@angular/core';
import { Sprint } from '../../../models/sprint.model'


@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(sprints: Sprint[], path: string[], order: number): Sprint[] {
    //Return normal array if any error with the parameters
    if (!sprints || !path || !order) return sprints;

    //Algorithm to sort the array depending on the chosen property
    return sprints.sort((a: Sprint, b: Sprint) => {
      path.forEach(property => {
        a = a[property];
        b = b[property]
      })
      
      //Order is used to set the order on ascending or descending
      return a > b ? order: order * (-1);
    })
  }
}
