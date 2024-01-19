# MinigamePuzzle

This game consist on a serie of single pieces which can be put together in order to build a complete image.

Visually, there are two parts:

* The upper part contains the puzzle as put together (board)
* The lower part contains the remaining pieces not yet put on the board

## Requirements

* The user is able to select a piece from the remainings and move it to the board (drag and drop).
* During the drag-and-drop, the places in the remaining pieces remains empty.
* After a successful drop of the piece, the list of remaining pieces is updated.
Landing rules
* The piece landing position is mapped on a grid and aligned to the nearest non-empty overlaped cell.
  * If there are no non-empty overlaped cells, the piece is sent back to the remaining parts.
* Two non matching pieces can be put next to each other.
  * If so they are simply displayed (no matching tests).


## Code scaffolding

Run `ng generate component component-name --project minigame-puzzle` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project minigame-puzzle`.
> Note: Don't forget to add `--project minigame-puzzle` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build minigame-puzzle` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build minigame-puzzle`, go to the dist folder `cd dist/minigame-puzzle` and run `npm publish`.

## Running unit tests

Run `ng test minigame-puzzle` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
