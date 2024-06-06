function dijkstra(graph, start) {
    const distances = {};
    const visited = {};
    const pq = new PriorityQueue();

    // Initialize distances and priority queue
    for (let vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
            pq.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            pq.enqueue(vertex, Infinity);
        }
    }

    while (!pq.isEmpty()) {
        const { vertex } = pq.dequeue();

        if (!visited[vertex]) {
            visited[vertex] = true;

            for (let neighbor in graph[vertex]) {
                let newDist = distances[vertex] + graph[vertex][neighbor];
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    pq.enqueue(neighbor, newDist);
                }
            }
        }
    }

    return distances;
}

class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element, priority) {
        const node = { vertex: element, priority: priority };
        if (this.isEmpty()) {
            this.collection.push(node);
        } else {
            let added = false;
            for (let i = 0; i < this.collection.length; i++) {
                if (priority < this.collection[i].priority) {
                    this.collection.splice(i, 1, node);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(node);
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}


const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};


console.log(dijkstra(graph,'A'));
