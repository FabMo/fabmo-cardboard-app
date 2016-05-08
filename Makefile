fabmo-cardboard-app.fma: clean *.html js/*.js js/libs/*.js css/*.css svg/hex.svg icon.png package.json
	zip fabmo-cardboard-app.fma *.html js/*.js js/libs/*.js css/*.css svg/hex.svg icon.png package.json

.PHONY: clean

clean:
	rm -rf fabmo-cardboard-app.fma
