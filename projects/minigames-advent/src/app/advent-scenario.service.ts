import { Injectable } from '@angular/core';
import { AdventScenario, AdventScenarioMemory, AdventScenarioParkingjam, AdventScenarioPuzzle, AdventScenarioWordle } from './shared/advent-scenario.model';
import { MinigameParkingjamCar } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-car.model';
import { MinigameParkingjamWall } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-wall.model';

@Injectable({
  providedIn: 'root'
})
export class AdventScenarioService {
  private FIRST_DECEMBER = new Date(2023, 10, 1, 0, 0, 0, 0).getTime();
  private MILlIS_PER_DAY = 86400000;

  private scenarios: AdventScenario[] = [];

  constructor() {}

  loadScenarios(): AdventScenario[] {
    if (this.scenarios.length == 0) {
      this.scenarios = Object.keys(localStorage)
        .filter(k => k.search('_scenario_id') > -1)
        .sort()
        .map(k => localStorage.getItem(k))
        .map(k => this.loadScenario(k!));
      this.updateEnabledScenario();
    }
    return this.scenarios;
  }

  private loadScenario(id: string): AdventScenario {
    let type = localStorage.getItem(id + "_scenario_type");
    if (type === "wordle") {
      return this.loadScenarioWordle(id);
    } else if (type === "memory") {
      return this.loadScenarioMemory(id);
    } else if (type === "parkingjam") {
      return this.loadScenarioParkingjam(id);
    } else if (type === "puzzle") {
      return new AdventScenarioPuzzle(id);
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
    let cardSetId = localStorage.getItem(id + "_cardSetId") ?? "";
    return this.loadScenarioStatus(new AdventScenarioMemory(id, width, height, cardSetId));
  }

  loadScenarioParkingjam(id: string): AdventScenarioParkingjam {
    let width = this.parseIntOrDefault(localStorage.getItem(id + "_width"), 0);
    let height = this.parseIntOrDefault(localStorage.getItem(id + "_height"), 0);

    let cars: MinigameParkingjamCar[] = this.loadCars(id);
    let walls: MinigameParkingjamWall[] = this.loadWalls(id);

    let bonusMoves = this.parseIntOrDefault(localStorage.getItem(id + "_bonusMoves"), 0);
    return this.loadScenarioStatus(new AdventScenarioParkingjam(id, width, height, cars, walls, bonusMoves));
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
    scenario.enabled = this.parseBooleanOrDefault(localStorage.getItem(scenario.prefix + "_enabled"), false);
    return scenario;
  }

  getScenarioWordle(prefix: string): AdventScenarioWordle {
    return this.scenarios.filter(s => s.prefix === prefix)[0] as AdventScenarioWordle;
  }

  getScenarioMemory(prefix: string): AdventScenarioMemory {
    return this.scenarios.filter(s => s.prefix === prefix)[0] as AdventScenarioMemory;
  }

  getScenarioParkingjam(prefix: string): AdventScenarioParkingjam {
    return this.scenarios.filter(s => s.prefix === prefix)[0] as AdventScenarioParkingjam;
  }

  markCompleted(scenario: AdventScenario) {
    this.saveScoreStatus(scenario);
    this.updateEnabledScenario();
  }

  private updateEnabledScenario() {
    let lastCompleted = -1;
    for (let i = 0; i < this.scenarios.length; i++) {
      let s = this.scenarios[i];
      if (s.completed) {
        lastCompleted = i;
        console.log(`enabled: ${s.enabled}`);
      } else {
        break;
      }
    }
    console.log(`Last completed scenario = ${lastCompleted}`);
    
    let date = new Date();
    let diff = Math.floor((date.getTime() - this.FIRST_DECEMBER) / this.MILlIS_PER_DAY);
    let next = lastCompleted + 1;
    if (next <= diff && next < this.scenarios.length && !this.scenarios[next].enabled) {
      let s = this.scenarios[next];
      console.log(`Enabling scenario ${s.prefix}`)
      s.enabled = true;
      localStorage.setItem(s.prefix + "_enabled", `${s.enabled}`);
    }
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
        localStorage.setItem(id + "_enabled", `${s.enabled}`);

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
    localStorage.setItem(id + "_cardSetId", scenario.cardSetId);
  }

  private saveScenarioParkingjam(id: string, scenario: AdventScenarioParkingjam) {
    localStorage.setItem(id + "_width", '' + scenario.width);
    localStorage.setItem(id + "_height", '' + scenario.height);
    localStorage.setItem(id + "_bonusMoves", '' + scenario.bonusMoves);
    
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
