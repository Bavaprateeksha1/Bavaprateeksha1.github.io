body, html {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  height: 100%;
  color: white;
}

/* BACKGROUND */
.background {
  background: url('bg.png') no-repeat center center fixed;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  animation: zoomMove 25s infinite linear;
  filter: brightness(1.05) saturate(1.2);
}

@keyframes zoomMove {
  0% { transform: scale(1) translate(0, 0); }
  50% { transform: scale(1.1) translate(-10px, -10px); }
  100% { transform: scale(1) translate(0, 0); }
}

/* CANVAS STARS */
#stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -9;
  pointer-events: none;
}

/* NAVIGATION */
nav {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.nav-left {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.nav-right {
  position: absolute;
  left: 47%; /* moved slightly left */
  transform: translateX(-50%);
  display: flex;
  list-style: none;
  gap: 25px;
}

.nav-right li {
  cursor: pointer;
  font-weight: 500;
  background: linear-gradient(45deg, #87CEFA, #FF69B4, #00FFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.2s ease;
}

.nav-right li:hover {
  transform: scale(1.1);
}

/* HERO SECTION */
#hero {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;
}

.hero-text h1 {
  font-size: 3rem;
  margin: 0;
}

.hero-text p {
  margin-top: 10px;
  font-size: 1.2rem;
}

.hero-text button {
  margin-top: 20px;
  padding: 10px 25px;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  background-color: #00BFFF;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.hero-text button:hover {
  background-color: #009ACD;
}

.gradient-text {
  background: linear-gradient(45deg, #FF69B4, #87CEFA, #BA55D3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* MODALS */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal-box {
  width: 90%;
  max-width: 800px;
  background: rgba(28, 28, 43, 0.9);
  border-radius: 15px;
  padding: 30px;
  color: #fff;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  font-size: 1.5rem;
  background: linear-gradient(45deg, #DCC5B2, #F0E4D3, #FAF7F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 2rem;
  cursor: pointer;
  color: #fff;
}

/* CARD GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background: #2a2a40;
  padding: 15px;
  border-radius: 12px;
  transition: transform 0.3s ease;
  box-shadow: 0 0 10px rgba(255,255,255,0.1);
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.card h3 {
  margin: 10px 0 5px 0;
  font-size: 1.1rem;
}

.card p {
  font-size: 0.95rem;
  color: #ccc;
}

.modal-box::-webkit-scrollbar {
  width: 6px;
}
.modal-box::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
