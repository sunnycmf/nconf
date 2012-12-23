/*
 * dir-store-test.js: Tests for the nconf Dir store.
 *
 * (C) 2011, Nodejitsu Inc.
 *
 */

var fs = require('fs'),
    path = require('path'),
    vows = require('vows'),
    assert = require('assert'),
    nconf = require('../../lib/nconf'),
    store;

var configDir = path.join(__dirname, '..', 'fixtures', 'dir-config');

vows.describe('nconf/stores/dir').addBatch({
  "When using the nconf dir store": {
    "with no environment set": {
      topic: function () {
        this.store = store = new nconf.Dir({
          dir: path.join(configDir, 'no-env')
        });
        return null;
      },
      "the load() method": {
        topic: function () {
          this.store.load(this.callback);
        },
        "should load the data correctly": function (err, data) {
          assert.isNull(err);
          assert.deepEqual(data, this.store.store);
        }
      }
    },
    "with an environment set": {
      topic: function () {
        this.store = store = new nconf.Dir({
          dir: path.join(configDir, 'with-env'),
          env: 'production'
        });
        return null;
      },
      "the load() method": {
        topic: function () {
          this.store.load(this.callback);
        },
        "should load the data correctly": function (err, data) {
          assert.isNull(err);
          assert.deepEqual(data, this.store.store);
          assert.equal(this.store.get('foo:env'), 'production');
        }
      }
    }
  }
})/*.addBatch({
  "When using the nconf file store": {
    topic: function () {
      var tmpPath = path.join(__dirname, '..', 'fixtures', 'tmp.json'),
          tmpStore = new nconf.File({ file: tmpPath });
      return tmpStore;
    },
    "the save() method": {
      topic: function (tmpStore) {
        var that = this;
        
        Object.keys(data).forEach(function (key) {
          tmpStore.set(key, data[key]);
        });        
        
        tmpStore.save(function () {
          fs.readFile(tmpStore.file, function (err, d) {
            fs.unlinkSync(tmpStore.file);

            return err
              ? that.callback(err)
              : that.callback(err, JSON.parse(d.toString()));
          });
        });
      },
      "should save the data correctly": function (err, read) {
        assert.isNull(err);
        assert.deepEqual(read, data);
      }
    }
  }
}).addBatch({
  "When using the nconf file store": {
    topic: function () {
      var tmpPath = path.join(__dirname, '..', 'fixtures', 'tmp.json'),
          tmpStore = new nconf.File({ file: tmpPath });
      return tmpStore;
    },
    "the saveSync() method": {
      topic: function (tmpStore) {
        var that = this;

        Object.keys(data).forEach(function (key) {
          tmpStore.set(key, data[key]);
        });

        var saved = tmpStore.saveSync();

        fs.readFile(tmpStore.file, function (err, d) {
          fs.unlinkSync(tmpStore.file);

          return err
            ? that.callback(err)
            : that.callback(err, JSON.parse(d.toString()), saved);
        });
      },
      "should save the data correctly": function (err, read, saved) {
        assert.isNull(err);
        assert.deepEqual(read, data);
        assert.deepEqual(read, saved);
      }
    }
  }
}).addBatch({
  "When using the nconf file store": {
    "the set() method": {
      "should respond with true": function () {
        assert.isTrue(store.set('foo:bar:bazz', 'buzz'));
        assert.isTrue(store.set('falsy:number', 0));
        assert.isTrue(store.set('falsy:string', ''));
        assert.isTrue(store.set('falsy:boolean', false));
        assert.isTrue(store.set('falsy:object', null));
      }
    },
    "the get() method": {
      "should respond with the correct value": function () {
        assert.equal(store.get('foo:bar:bazz'), 'buzz');
        assert.equal(store.get('falsy:number'), 0);
        assert.equal(store.get('falsy:string'), '');
        assert.equal(store.get('falsy:boolean'), false);
        assert.equal(store.get('falsy:object'), null);
      }
    },
    "the clear() method": {
      "should respond with the true": function () {
        assert.equal(store.get('foo:bar:bazz'), 'buzz');
        assert.isTrue(store.clear('foo:bar:bazz'));
        assert.isTrue(typeof store.get('foo:bar:bazz') === 'undefined');
      }
    }
  }
}).addBatch({
  "When using the nconf file store": {
    "the search() method": {
      "when the target file exists higher in the directory tree": {
        topic: function () {
          var filePath = this.filePath = path.join(process.env.HOME, '.nconf');
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          return new (nconf.File)({
            file: '.nconf'
          })
        },
        "should update the file appropriately": function (store) {
          store.search();
          assert.equal(store.file, this.filePath);
          fs.unlinkSync(this.filePath);
        }
      },
      "when the target file doesn't exist higher in the directory tree": {
        topic: function () {
          var filePath = this.filePath = path.join(__dirname, '..', 'fixtures', 'search-store.json');
          return new (nconf.File)({
            dir: path.dirname(filePath),
            file: 'search-store.json'
          })
        },
        "should update the file appropriately": function (store) {
          store.search();
          assert.equal(store.file, this.filePath);
        }
      }
    }
  }
})*/.export(module);