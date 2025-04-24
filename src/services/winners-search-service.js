const movieRepository = require('../repositories/movie-repository');

function findMaxAndMinWinners() {
    return new Promise((resolve, reject) => {
      movieRepository.getProducersWithMoreThanOneWin().then((producers) => {

        const awardsByProducer = producers.reduce((acc, { producer, year }) => {
          if (!acc[producer]) acc[producer] = [];
          acc[producer].push(year);
          acc[producer].sort((a, b) => a - b);
          return acc;
        }, {});
        
        const producersWithIntervals = Object.entries(awardsByProducer).map(
          ([producer, years]) => {
            const intervals = [];
        
            for (let i = 1; i < years.length; i++) {
              const interval = years[i] - years[i - 1];
              intervals.push({
                interval,
                previousWin: years[i - 1],
                followingWin: years[i],
              });
            }
        
            return {
              producer,
              intervals,
            };
          }
        );
        
        const allIntervals = producersWithIntervals.flatMap(p =>
          p.intervals.map(seq => seq.interval)
        );
        
        const minInterval = Math.min(...allIntervals);
        const maxInterval = Math.max(...allIntervals);
        
        function groupConsecutiveIntervals(intervals, target) {
          const groups = [];
          let currentGroup = null;
        
          for (const seq of intervals) {
            if (seq.interval === target) {
              if (currentGroup && seq.previousWin === currentGroup.followingWin) {
                currentGroup.followingWin = seq.followingWin;
              } else {
                currentGroup = { ...seq };
                groups.push(currentGroup);
              }
            } else {
              currentGroup = null;
            }
          }
        
          return groups;
        }
        
        const minIntervalProducers = producersWithIntervals.flatMap(p => {
          const groups = groupConsecutiveIntervals(p.intervals, minInterval);
          return groups.map(group => ({
            producer: p.producer,
            interval: minInterval,
            previousWin: group.previousWin,
            followingWin: group.followingWin
          }));
        });
        
        const maxIntervalProducers = producersWithIntervals.flatMap(p => {
          const groups = groupConsecutiveIntervals(p.intervals, maxInterval);
          return groups.map(group => ({
            producer: p.producer,
            interval: maxInterval,
            previousWin: group.previousWin,
            followingWin: group.followingWin
          }));
        });
        
        const result = {
          min: minIntervalProducers,
          max: maxIntervalProducers
        };
        
        resolve(result);
      }).catch(reject);
    });
}

module.exports = { findMaxAndMinWinners };