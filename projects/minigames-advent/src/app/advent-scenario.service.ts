import { Injectable } from '@angular/core';
import { AdventScenario, AdventScenarioMemory, AdventScenarioParkingjam, AdventScenarioWordle } from './shared/advent-scenario.model';
import { MinigameParkingjamCar } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-car.model';
import { MinigameParkingjamWall } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-wall.model';

@Injectable({
  providedIn: 'root'
})
export class AdventScenarioService {
   constructor() {}

  loadScenarios(): AdventScenario[] {
    return Object.keys(localStorage)
      .filter(k => k.search('_scenario_id') > -1)
      .sort()
      .map(k => localStorage.getItem(k))
      .map(k => this.loadScenario(k!));
  }

  private loadScenario(id: string): AdventScenario {
    let type = localStorage.getItem(id + "_scenario_type");
    if (type === "wordle") {
      return this.loadScenarioWordle(id);
    } else if (type === "memory") {
      return this.loadScenarioMemory(id);
    } else if (type === "parkingjam") {
      return this.loadScenarioParkingjam(id);
    } else {
      throw new Error('Unknown scenario type: ' + type);
    }
  }

  loadScenarioWordle(id: string): AdventScenarioWordle {
    let word = localStorage.getItem(id + "_word");
    return this.loadScenarioStatus(new AdventScenarioWordle(id, (word) ? word : ""));
  }

  loadScenarioMemory(id: string): AdventScenarioMemory {
    let width = this.parseIntOrDefault(localStorage.getItem(id + "_width"), 0);
    let height = this.parseIntOrDefault(localStorage.getItem(id + "_height"), 0);
    return this.loadScenarioStatus(new AdventScenarioMemory(id, width, height));
  }

  loadScenarioParkingjam(id: string): AdventScenarioParkingjam {
    let width = this.parseIntOrDefault(localStorage.getItem(id + "_width"), 0);
    let height = this.parseIntOrDefault(localStorage.getItem(id + "_height"), 0);

    let cars: MinigameParkingjamCar[] = this.loadCars(id);
    let walls: MinigameParkingjamWall[] = this.loadWalls(id);
    return this.loadScenarioStatus(new AdventScenarioParkingjam(id, width, height, cars, walls));
  }

  private loadCars(prefix: string): MinigameParkingjamCar[] {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .filter(k => k.search('_car_id') > -1)
      .map(k => {
        let id = localStorage.getItem(k);
        return (id) ? +id : 0;
      })
      .filter(id => id != 0)
      .map(id => new MinigameParkingjamCar(id).load(prefix));
  }

  private loadWalls(prefix: string): MinigameParkingjamWall[] {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .filter(k => k.search('_wall_id') > -1)
      .map(k => {
        let id = localStorage.getItem(k);
        return (id) ? +id : 0;
      })
      .filter(id => id != 0)
      .map(id => new MinigameParkingjamWall(id).load(prefix));
  }

  private loadScenarioStatus<T extends AdventScenario>(scenario: T): T {
    scenario.completed = this.parseBooleanOrDefault(localStorage.getItem(scenario.prefix + "_completed"), false);
    scenario.bonus = this.parseBooleanOrDefault(localStorage.getItem(scenario.prefix + "_bonus"), false);
    return scenario;
  }

  saveScoreStatus(scenario: AdventScenario): void {
    localStorage.setItem(scenario.prefix + "_completed", `${scenario.completed}`);
    localStorage.setItem(scenario.prefix + "_bonus", `${scenario.bonus}`);
  }

  saveScenarios(scenarios: AdventScenario[]): void {
    scenarios
      .filter(s => this.isNotSaved(s))
      .forEach(s => {
        let id = s.prefix;
        localStorage.setItem(id + "_scenario_id", id);
        localStorage.setItem(id + "_scenario_type", s.type);
        localStorage.setItem(id + "_completed", `${s.completed}`);
        localStorage.setItem(id + "_bonus", `${s.bonus}`);

        if (s instanceof AdventScenarioWordle) {
          this.saveScenarioWordle(id, s as AdventScenarioWordle);
        } else if (s instanceof AdventScenarioMemory) {
          this.saveScenarioMemory(id, s as AdventScenarioMemory);
        } else if (s instanceof AdventScenarioParkingjam) {
          this.saveScenarioParkingjam(id, s as AdventScenarioParkingjam);
        }
      });
  }

  private isNotSaved(scenario: AdventScenario): boolean {
    return localStorage.getItem(scenario.prefix + "_scenario_id") === null;
  }

  private saveScenarioWordle(id: string, scenario: AdventScenarioWordle) {
    localStorage.setItem(id + "_word", scenario.word);
  }

  private saveScenarioMemory(id: string, scenario: AdventScenarioMemory) {
    localStorage.setItem(id + "_width", '' + scenario.width);
    localStorage.setItem(id + "_height", '' + scenario.height);
  }

  private saveScenarioParkingjam(id: string, scenario: AdventScenarioParkingjam) {
    localStorage.setItem(id + "_width", '' + scenario.width);
    localStorage.setItem(id + "_height", '' + scenario.height);
    
    scenario.cars.forEach(c => c.store(id));
    scenario.walls.forEach(w => w.store(id));
  }

  private parseIntOrDefault(text: string | null, defaultValue: number): number {
    return (text) ? parseInt(text) : defaultValue;
  }

  private parseBooleanOrDefault(text: string | null, defaultValue: boolean): boolean {
    return (text) ? text === "true" : defaultValue;
  }
}
