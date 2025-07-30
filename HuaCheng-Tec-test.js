// 滑动
let currentSlide = 0;
const slider = document.getElementById('hero-slider');
function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}
function changeSlide(dir) { currentSlide = (currentSlide + dir + 3) % 3; updateSlider(); }
function goToSlide(i) { currentSlide = i; updateSlider(); }
setInterval(() => changeSlide(1), 5000);

// 产品卡片动画
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
    });
}, { threshold: .3 });
document.querySelectorAll('.product-card').forEach(c => io.observe(c));

// 卡片点击
document.querySelectorAll('.product-card').forEach(c => {
    c.addEventListener('click', () => window.location.href = c.dataset.url);
});

// 图表
Chart.defaults.font.family = 'Inter';
Chart.defaults.color = '#64748b';

new Chart(document.getElementById('trafficChart'), {
    type: 'doughnut',
    data: { labels: ['北美', '欧洲', '亚太', '其他'], datasets: [{ data: [3500.00, 2800.00, 3000.00, 700.00], backgroundColor: ['#3b82f6', 'red', '#ec4899', 'yellow'], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
});

new Chart(document.getElementById('performanceChart'), {
    type: 'line',
    data: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
            { label: '统计时间 (ms)', data: [45, 42, 38, 35, 33, 30], borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,.1)', tension: .4, fill: true },
            { label: '吞人气量 (K per)', data: [120, 135, 150, 165, 180, 200], borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,.1)', tension: .4, fill: true }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
});

new Chart(document.getElementById('efficiencyChart'), {
    type: 'radar',
    data: {
        labels: ['粉丝见面会', '品牌代言', '星级影响力', '特殊赛事', '论坛互动指数'],
        datasets: [
            { label: '当前状态', data: [85, 78, 92, 88, 95], backgroundColor: 'rgba(59,130,246,.2)', borderColor: '#3b82f6' },
            { label: '行业平均', data: [65, 70, 75, 80, 85], backgroundColor: 'rgba(139,92,246,.2)', borderColor: '#8b5cf6' }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { r: { beginAtZero: true, max: 100 } } }
});

// 如果移动端也想要点击展开，再加两行
const moreBtn = document.getElementById('moreBtn');
moreBtn.addEventListener('click', e => e.preventDefault());

// 评论区
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const commentsSlider = document.querySelector('.comments-slider');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            const commentItems = commentsSlider.querySelectorAll('.comment-item');
            commentItems.forEach(item => {
                const commentText = item.textContent.trim().toLowerCase();
                if (commentText.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        } else {
            commentsSlider.querySelectorAll('.comment-item').forEach(item => {
                item.style.display = 'block';
            });
        }
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
});