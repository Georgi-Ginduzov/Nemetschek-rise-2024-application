export class Drone {
    constructor(currentLocation) {
      this.currentLocation = currentLocation;
      this.destination = null;
      this.status = 'idle';
    }

    calculateTimeToDestination(destination) {
    console.log(destination);
    }
}

