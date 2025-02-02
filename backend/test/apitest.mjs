(async () => {
    const { default: chai } = await import('chai');
    const { default: chaiHttp } = await import('chai-http');
    const app = require('../index');  // Path to your app
  
    const { expect } = chai;
    chai.use(chaiHttp);
  
    describe('GET /api/faqs/getallfaqs', function() {
        this.timeout(10000); // Increase the timeout
        it('should return all FAQs', (done) => {
            chai.request(app)
                .get('/api/faqs/getallfaqs')
                .end((err, res) => {
                    if (err) {
                        console.log(err); // Log any errors
                    }
                    console.log(res.body); // Log the response body
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
})();