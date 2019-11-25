class NeuralNetwork {
    constructor(a, b, c, d) {
        if(a instanceof tf.Sequential) {
            this.model = a;
            this.input_nodes = b;
            this.hidden_nodes = c;
            this.output_nodes = d;
        } else {            
            this.input_nodes = a;
            this.hidden_nodes = b;
            this.output_nodes = c;
            this.model = this.createModel();
        }
    }

    copy() {
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightsCopies = [];
            for(let i = 0; i < weights.length; i++) {
                weightsCopies[i] = weights[i].clone();
            }
            modelCopy.setWeights(weightsCopies);
            return new NeuralNetwork(modelCopy, this.input_nodes, this.hidden_nodes, this.output_nodes);
        });
    }

    predict(inputs) {
        return tf.tidy(() => {
            const xs = tf.tensor2d([inputs]);
            const ys = this.model.predict(xs);
            const outputs = ys.dataSync();            
            return outputs;
        });
    }

    createModel() {
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: "sigmoid"
        });
        model.add(hidden);
        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: "sigmoid"
        });
        model.add(output);
        return model;
    }
}